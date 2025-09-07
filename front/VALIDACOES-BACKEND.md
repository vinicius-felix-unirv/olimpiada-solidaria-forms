# 🔧 Validações Backend - Especificações Técnicas

> **Especificações técnicas para implementação das validações no backend**

## 📚 **Documentos Relacionados**

- **[STACK-TECNOLOGICA.md](./STACK-TECNOLOGICA.md)**: Stack geral e estrutura do projeto
- **[TELA-CADASTRO-DOCUMENTACAO.md](./TELA-CADASTRO-DOCUMENTACAO.md)**: Implementação frontend (referência)
- **[CONTRIBUTING.md](./CONTRIBUTING.md)**: Padrões de desenvolvimento

---

## 🎯 **Objetivo**

Este documento especifica as **validações que devem ser implementadas no backend** para garantir a integridade dos dados recebidos do frontend da tela de cadastro médico.

## 📨 **Formato de Dados Recebidos**

### **Endpoint: `POST /api/cadastro`**

```json
{
  "nome_completo": "Dr. João Silva Santos",
  "crm": "12345/SP",
  "especialidade": "Cardiologia",
  "instituicao": "Hospital das Clínicas",
  "email": "joao@hospital.com",
  "telefone": "11912345678",
  "senha": "senha123"
}
```

---

## ✅ **Validações Obrigatórias no Backend**

### **1. CRM (Crítico - Verificar Duplicatas)**
```python
def validate_crm(crm: str) -> dict:
    import re
    
    # Formato: número/UF
    pattern = r'^(\d{1,7})/([A-Z]{2})$'
    match = re.match(pattern, crm.upper())
    
    if not match:
        raise ValidationError("CRM deve estar no formato: número/UF")
    
    numero, uf = match.groups()
    
    # UFs válidas do Brasil + TE (teste)
    ufs_validas = [
        'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 
        'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 
        'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO', 'TE'
    ]
    
    if uf not in ufs_validas:
        raise ValidationError(f"UF inválida: {uf}")
    
    # CRÍTICO: Verificar se CRM já existe
    if crm_exists_in_database(crm):
        raise ValidationError("Este CRM já está cadastrado")
    
    return {"numero": numero, "uf": uf, "crm_completo": crm}
```

### **2. Email (Verificar Duplicatas)**
```python
def validate_email(email: str) -> str:
    import re
    
    email = email.lower().strip()
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    
    if not re.match(pattern, email):
        raise ValidationError("Formato de email inválido")
    
    # CRÍTICO: Verificar se email já existe
    if email_exists_in_database(email):
        raise ValidationError("Este email já está cadastrado")
    
    return email
```

### **3. Telefone Brasileiro**
```python
def validate_telefone(telefone: str) -> dict:
    import re
    
    # Remover tudo que não é número
    apenas_numeros = re.sub(r'\D', '', telefone)
    
    # Remover código do país (55) se presente
    if apenas_numeros.startswith('55') and len(apenas_numeros) >= 12:
        apenas_numeros = apenas_numeros[2:]
    
    # Validar formato brasileiro
    if len(apenas_numeros) == 10:
        # Telefone fixo
        tipo = "fixo"
    elif len(apenas_numeros) == 11:
        # Celular: deve ter 9 como terceiro dígito
        if apenas_numeros[2] != '9':
            raise ValidationError("Celular deve ter 9 após o DDD")
        tipo = "celular"
    else:
        raise ValidationError("Telefone inválido")
    
    return {"telefone_limpo": apenas_numeros, "tipo": tipo}
```

### **4. Senha (Hash Obrigatório)**
```python
def validate_and_hash_senha(senha: str) -> str:
    import re
    import bcrypt
    
    if len(senha) < 6:
        raise ValidationError("Senha deve ter pelo menos 6 caracteres")
    
    # Deve conter letra e número
    if not re.search(r'[A-Za-z]', senha) or not re.search(r'\d', senha):
        raise ValidationError("Senha deve conter letra e número")
    
    # CRÍTICO: SEMPRE fazer hash
    senha_hash = bcrypt.hashpw(senha.encode('utf-8'), bcrypt.gensalt())
    return senha_hash.decode('utf-8')
```

---

## 🗄️ **Estrutura de Banco Sugerida**

```sql
CREATE TABLE medicos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome_completo VARCHAR(100) NOT NULL,
    crm VARCHAR(10) NOT NULL UNIQUE,
    especialidade VARCHAR(100) NOT NULL,
    instituicao VARCHAR(200) NOT NULL,
    email VARCHAR(254) NOT NULL UNIQUE,
    telefone VARCHAR(11) NOT NULL,
    senha_hash VARCHAR(255) NOT NULL,
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices
CREATE INDEX idx_medicos_crm ON medicos(crm);
CREATE INDEX idx_medicos_email ON medicos(email);
```

---

## 📤 **Respostas da API**

### **Sucesso (201)**
```json
{
    "success": true,
    "message": "Médico cadastrado com sucesso",
    "data": {
        "id": "uuid-do-medico",
        "nome_completo": "Dr. João Silva Santos",
        "crm": "12345/SP"
    }
}
```

### **Erro CRM Duplicado (409)**
```json
{
    "success": false,
    "message": "CRM já cadastrado",
    "error_code": "CRM_ALREADY_EXISTS"
}
```

### **Erro Email Duplicado (409)**
```json
{
    "success": false,
    "message": "Email já cadastrado", 
    "error_code": "EMAIL_ALREADY_EXISTS"
}
```

### **Dados Inválidos (400)**
```json
{
    "success": false,
    "message": "Dados inválidos",
    "errors": {
        "telefone": "Celular deve ter 9 após o DDD",
        "senha": "Senha deve conter letra e número"
    }
}
```

---

## 🔒 **Segurança Crítica**

### **1. Rate Limiting**
- Máximo 5 tentativas por IP por minuto
- Bloquear após muitas tentativas

### **2. Logs de Auditoria**
```python
def log_cadastro_attempt(dados: dict, success: bool, ip: str):
    # NUNCA logar senha
    safe_data = {k: v for k, v in dados.items() if k != 'senha'}
    audit_logger.info({
        'action': 'cadastro_medico',
        'data': safe_data,
        'success': success,
        'ip': ip,
        'timestamp': datetime.utcnow()
    })
```

### **3. Sanitização**
- Escapar HTML
- Remover caracteres perigosos
- Validar tamanhos máximos

---

## 🧪 **Dados de Teste**

### **Válidos**
```json
{
    "nome_completo": "Dr. João Silva Santos",
    "crm": "123456/SP",
    "especialidade": "Cardiologia",
    "instituicao": "Hospital das Clínicas",
    "email": "joao.teste@hospital.com",
    "telefone": "11912345678",
    "senha": "senha123"
}
```

### **Inválidos (para testar)**
```json
{
    "crm": "12345",          // Sem UF
    "email": "email@",       // Inválido
    "telefone": "11812345678", // Celular sem 9
    "senha": "123"           // Muito curta
}
```

---

## 🔄 **Integração Frontend**

No frontend, substituir:
```typescript
const response = await mockApiCall(apiData);

// Por:
const response = await fetch('/api/cadastro', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(apiData)
});

const result = await response.json();

if (result.error_code === 'CRM_ALREADY_EXISTS') {
  setValidationErrors({crm: 'Este CRM já está cadastrado'});
}
```

---

## ✅ **Checklist Backend**

- [ ] Validações implementadas
- [ ] Banco com índices únicos
- [ ] Hash de senhas
- [ ] Rate limiting
- [ ] Logs de auditoria
- [ ] Testes de validação
- [ ] Documentação da API

---

**🔧 Especificações completas para backend seguro!**  
**🛡️ Validação, segurança e integridade garantidas!**
