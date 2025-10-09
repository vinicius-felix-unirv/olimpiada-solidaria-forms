import express from 'express';
declare class App {
    app: express.Application;
    private readonly port;
    constructor();
    private initializeMiddlewares;
    private initializeRoutes;
    private initializeErrorHandling;
    start(): Promise<void>;
    stop(): Promise<void>;
}
export default App;
//# sourceMappingURL=app.d.ts.map