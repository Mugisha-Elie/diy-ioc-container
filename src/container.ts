export type Constructor<T = any> = new (...args: any[]) => T;

export class Container {
  private registry = new Map<Constructor, Constructor>();
  private instances = new Map<Constructor, any>();

  register<T>(target: Constructor<T>): void {
    this.registry.set(target, target);
  }

  resolve<T>(target: Constructor<T>): T {
    if(!this.registry.has(target)){
      throw new Error(`No provider was found for ${target.name}`)
    }

    if(this.instances.has(target)){
      return this.instances.get(target);
    }

    const dependencies: Constructor[] = (target as any).dependencies || [];
    const injections = dependencies.map(dep => this.resolve(dep));
    const instance = new target(...injections)

    this.instances.set(target, instance);

    return instance;
  }
}