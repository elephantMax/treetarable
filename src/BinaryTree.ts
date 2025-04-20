export class BinaryTree<T> {
  left: BinaryTree<T> | null;
  right: BinaryTree<T> | null;

  constructor(readonly value: T) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  // by default df itarator
  *[Symbol.iterator](): Generator<BinaryTree<T>> {
    yield* this.dfIterator();
  }

  *dfIterator(): Generator<BinaryTree<T>> {
    if (this.left) yield* this.left.dfIterator();

    yield this;

    if (this.right) yield* this.right.dfIterator();
  }

  *bfIterator(): Generator<BinaryTree<T>> {
    const queue: BinaryTree<T>[] = [this];

    while (queue.length) {
      const node = queue.shift()!;

      yield node;

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  *postOrderIterator(): Generator<BinaryTree<T>> {
    if (this.left) yield* this.left.postOrderIterator();
    if (this.right) yield* this.right.postOrderIterator();

    yield this;
  }

  *preOrderIterator(): Generator<BinaryTree<T>> {
    yield this;

    if (this.left) yield* this.left.preOrderIterator();
    if (this.right) yield* this.right.preOrderIterator();
  }

  map<B>(callback: (value: T) => B): BinaryTree<B> {
    const node = new BinaryTree(callback(this.value));

    if (this.left) node.left = this.left.map(callback);
    if (this.right) node.right = this.right.map(callback);

    return node;
  }

  find(
    predicate: (node: BinaryTree<T>) => boolean,
    iterator: Generator<BinaryTree<T>> = this[Symbol.iterator]()
  ): BinaryTree<T> | null {
    for (const node of iterator) {
      if (predicate(node)) return node;
    }

    return null;
  }

  forEach(
    callback: (node: BinaryTree<T>) => void,
    iterator: Generator<BinaryTree<T>> = this[Symbol.iterator]()
  ): void {
    for (const node of iterator) {
      callback(node);
    }
  }

  flat(
    iterator: Generator<BinaryTree<T>> = this[Symbol.iterator]()
  ): BinaryTree<T>[] {
    const res: BinaryTree<T>[] = [];

    for (const node of iterator) {
      res.push(node);
    }

    return res;
  }

  filter(predicate: (node: BinaryTree<T>) => boolean): BinaryTree<T> | null {
    const res = predicate(this);

    if (!res) return null;

    const newNode = new BinaryTree(this.value);

    newNode.left = this.left?.filter(predicate) ?? null;
    newNode.right = this.right?.filter(predicate) ?? null;

    return newNode;
  }

  getPathOfNode(
    predicate: (node: BinaryTree<T>) => boolean
  ): BinaryTree<T> | null {
    if (predicate(this)) return new BinaryTree(this.value);

    const leftPath = this.left?.getPathOfNode(predicate) ?? null;

    if (leftPath) {
      const path = new BinaryTree(this.value);
      path.left = leftPath;
      return path;
    }

    const rightPath = this.right?.getPathOfNode(predicate) ?? null;

    if (rightPath) {
      const path = new BinaryTree(this.value);
      path.right = rightPath;
      return path;
    }

    return null;
  }
}
