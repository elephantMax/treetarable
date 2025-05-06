export class BinaryTree<T> {
  left: BinaryTree<T> | null
  right: BinaryTree<T> | null

  /**
   * Creates a new BinaryTree node.
   * @param value - The value of the node.
   */
  constructor(readonly value: T) {
    this.value = value
    this.left = null
    this.right = null
  }

  /**
   * Default depth-first iterator for the binary tree.
   * @returns A generator that yields nodes in depth-first order.
   */
  *[Symbol.iterator](): Generator<BinaryTree<T>> {
    yield* this.dfIterator()
  }

  /**
   * Depth-first iterator for the binary tree.
   * @returns A generator that yields nodes in depth-first order.
   */
  *dfIterator(): Generator<BinaryTree<T>> {
    if (this.left) yield* this.left.dfIterator()
    yield this
    if (this.right) yield* this.right.dfIterator()
  }

  /**
   * Breadth-first iterator for the binary tree.
   * @returns A generator that yields nodes in breadth-first order.
   */
  *bfIterator(): Generator<BinaryTree<T>> {
    const queue: BinaryTree<T>[] = [this]
    while (queue.length) {
      const node = queue.shift()!
      yield node
      if (node.left) queue.push(node.left)
      if (node.right) queue.push(node.right)
    }
  }

  /**
   * Post-order iterator for the binary tree.
   * @returns A generator that yields nodes in post-order.
   */
  *postOrderIterator(): Generator<BinaryTree<T>> {
    if (this.left) yield* this.left.postOrderIterator()
    if (this.right) yield* this.right.postOrderIterator()
    yield this
  }

  /**
   * Pre-order iterator for the binary tree.
   * @returns A generator that yields nodes in pre-order.
   */
  *preOrderIterator(): Generator<BinaryTree<T>> {
    yield this
    if (this.left) yield* this.left.preOrderIterator()
    if (this.right) yield* this.right.preOrderIterator()
  }

  /**
   * Maps the values of the binary tree to a new binary tree.
   * @param callback - A function to transform the value of each node.
   * @returns A new binary tree with transformed values.
   */
  map<B>(callback: (value: T) => B): BinaryTree<B> {
    const node = new BinaryTree(callback(this.value))
    if (this.left) node.left = this.left.map(callback)
    if (this.right) node.right = this.right.map(callback)
    return node
  }

  /**
   * Finds a node in the binary tree that satisfies the given predicate.
   * @param predicate - A function to test each node.
   * @param iterator - An optional iterator to traverse the tree.
   * @returns The first node that satisfies the predicate, or null if none found.
   */
  find(
    predicate: (node: BinaryTree<T>) => boolean,
    iterator: Generator<BinaryTree<T>> = this[Symbol.iterator](),
  ): BinaryTree<T> | null {
    for (const node of iterator) {
      if (predicate(node)) return node
    }
    return null
  }

  /**
   * Executes a callback function for each node in the binary tree.
   * @param callback - A function to execute for each node.
   * @param iterator - An optional iterator to traverse the tree.
   */
  forEach(
    callback: (node: BinaryTree<T>) => void,
    iterator: Generator<BinaryTree<T>> = this[Symbol.iterator](),
  ): void {
    for (const node of iterator) {
      callback(node)
    }
  }

  /**
   * Flattens the binary tree into an array of nodes.
   * @param iterator - An optional iterator to traverse the tree.
   * @returns An array of nodes in the binary tree.
   */
  flat(
    iterator: Generator<BinaryTree<T>> = this[Symbol.iterator](),
  ): BinaryTree<T>[] {
    const res: BinaryTree<T>[] = []
    for (const node of iterator) {
      res.push(node)
    }
    return res
  }

  /**
   * Filters the binary tree based on a predicate function.
   * @param predicate - A function to test each node.
   * @returns A new binary tree containing only the nodes that satisfy the predicate, or null if none.
   */
  filter(predicate: (node: BinaryTree<T>) => boolean): BinaryTree<T> | null {
    const res = predicate(this)
    if (!res) return null
    const newNode = new BinaryTree(this.value)
    newNode.left = this.left?.filter(predicate) ?? null
    newNode.right = this.right?.filter(predicate) ?? null
    return newNode
  }

  /**
   * Gets the path from the root to a node that satisfies the predicate.
   * @param predicate - A function to test each node.
   * @returns A binary tree representing the path to the node, or null if not found.
   */
  getPathOfNode(
    predicate: (node: BinaryTree<T>) => boolean,
  ): BinaryTree<T> | null {
    if (predicate(this)) return new BinaryTree(this.value)
    const leftPath = this.left?.getPathOfNode(predicate) ?? null
    if (leftPath) {
      const path = new BinaryTree(this.value)
      path.left = leftPath
      return path
    }
    const rightPath = this.right?.getPathOfNode(predicate) ?? null
    if (rightPath) {
      const path = new BinaryTree(this.value)
      path.right = rightPath
      return path
    }
    return null
  }

  /**
   * Reduces the binary tree to a single value by applying a callback function
   * to each node in the tree, in depth-first order.
   *
   * @typeParam R - The type of the accumulated result.
   * @param callback - A function that is called for each node in the tree. It receives
   * the accumulated value and the current node as arguments, and returns the updated
   * accumulated value.
   * @param initialValue - An optional initial value to start the reduction. If not provided,
   * the first node in the iteration will be used as the initial value.
   * @returns The final accumulated value after processing all nodes in the tree.
   */
  reduce(
    callbackfn: (
      previousValue: BinaryTree<T>,
      currentValue: BinaryTree<T>,
    ) => BinaryTree<T>,
  ): BinaryTree<T>
  reduce(
    callbackfn: (
      previousValue: BinaryTree<T>,
      currentValue: BinaryTree<T>,
    ) => BinaryTree<T>,
    initalValue: BinaryTree<T>,
  ): BinaryTree<T>
  reduce<R>(
    callbackfn: (previousValue: R, currentValue: BinaryTree<T>) => R,
    initalValue: R,
  ): R
  reduce<R = BinaryTree<T>>(
    callback: (previousValue: R, currentValue: BinaryTree<T>) => R,
    initialValue?: R,
  ): R {
    let value = initialValue

    for (const node of this) {
      value = typeof value === 'undefined' ? (node as R) : callback(value, node)
    }

    return value as R
  }
}
