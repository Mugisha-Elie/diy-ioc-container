export type Constructor<T = any> = new (...args: any[]) => T;
export type Token<T = any> = Constructor<T> | string | symbol;

export interface ValueProvider<T = any> {
  provide: Token<T>;
  useValue: T;
}

export interface ClassProvider<T = any> {
  provide: Token<T>;
  useClass: Constructor<T>;
}

export interface FactoryProvider<T = any> {
  provide: Token<T>;
  useFactory: (...args: any[]) => T;
  inject?: Token[]
} 

export type Provider<T = any> = 
| Constructor<T>
| ValueProvider<T>
| ClassProvider<T>
| FactoryProvider<T>


export class Container {
  private registry = new Map<Token, Provider>();
  private instances = new Map<Token, any>;

  register<T>(provider: Provider<T>): void {
    if(typeof provider === 'function'){
      this.registry.set(provider, provider);
      return;
    }

    this.registry.set(provider.provide, provider)
  }

  resolve<T>(token: Token<T>): T {
    if(this.instances.has(token)){
      return this.instances.get(token);
    }

    const provider = this.registry.get(token);
    if(!provider){
      const tokenName = typeof token === 'symbol' ? token.toString() : String(token)
      throw new Error(`No provider found for token: ${tokenName}`)
    }

    let instance: any;

    if(typeof provider === 'function'){
      instance = this.instantiateClass(provider);
    }else if('useValue' in provider){
      instance = provider.useValue;
    }
  }

  
}