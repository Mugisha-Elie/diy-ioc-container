export type Constructor<T = any> = new (...args: any[]) => T; 

export class Container {
  private registry = new Map<Constructor, Constructor>();

  register<T>(target: Constructor<T>): void {
    this.registry.set(target, target)
  }

  resolve<T>(target: Constructor<T>): T{
    if (!this.registry.has(target)) {
      throw new Error(`No provider was found for ${target.name}`)
    }

    const dependencies: Constructor[] = (target as any).dependencies || []
    const injections = dependencies.map(dep => this.resolve(dep))

    return new target(...injections)
  }
}