import { Container } from './container.js'

class LoggerService {
  log(message: string): void {
    console.log(`[LOG]: ${message}`);
  }
}

class DatabaseService {
  getData(): string {
    return 'User record #42';
  }
}

class UsersService {
  constructor(
    private logger: LoggerService,
    private db: DatabaseService
  ) {}

  getUser(): void {
    this.logger.log('Fetching user...');
    const data = this.db.getData();
    this.logger.log(`Found: ${data}`);
  }
}


(UsersService as any).dependencies = [LoggerService, DatabaseService];

const container = new Container();

container.register(LoggerService);
container.register(DatabaseService);
container.register(UsersService);

const usersService = container.resolve(UsersService)
usersService.getUser();