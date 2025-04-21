# Treetarable

Treetarable is a lightweight and flexible library for working with binary tree data structures. It provides an elegant API for traversing, manipulating, and querying binary trees using modern JavaScript features like generators and iterators.

> **Note**: This library is currently in development. Features and APIs may change in future releases.

## Features

- **Generator-based traversal**: Supports depth-first, breadth-first, pre-order, post-order, and default (in-order) traversal.
- **Tree manipulation**: Map, flatten and reduce tree nodes with ease.
- **Node querying**: Find nodes or paths based on custom predicates.
- **Customizable iteration**: Use built-in iterators or define your own.

## Installation

Install the library via npm:

```bash
npm install treetarable
```

## Usage

### Creating a Binary Tree

```typescript
import {BinaryTree} from "treetarable";

// Create a binary tree
const root = new BinaryTree(1);
root.left = new BinaryTree(2);
root.right = new BinaryTree(3);
root.left.left = new BinaryTree(4);
root.left.right = new BinaryTree(5);
```

### Traversing the Tree

#### Depth-First Traversal (Default)

```typescript
for (const node of root) {
  console.log(node.value); // 4, 2, 5, 1, 3
}
```

#### Breadth-First Traversal

```typescript
for (const node of root.bfIterator()) {
  console.log(node.value); // 1, 2, 3, 4, 5
}
```

#### Pre-Order Traversal

```typescript
for (const node of root.preOrderIterator()) {
  console.log(node.value); // 1, 2, 4, 5, 3
}
```

#### Post-Order Traversal

```typescript
for (const node of root.postOrderIterator()) {
  console.log(node.value); // 4, 5, 2, 3, 1
}
```

### Manipulating the Tree

#### Mapping Node Values

```typescript
const newTree = root.map((value) => value * 2);
for (const node of newTree) {
  console.log(node.value); // 8, 4, 10, 2, 6
}
```

#### Flattening the Tree

```typescript
const flatNodes = root.flat();
console.log(flatNodes.map((node) => node.value)); // [4, 2, 5, 1, 3]
```

#### Reducing the Tree

```typescript
const sum = root.reduce((acc, node) => acc + node.value, 0);
console.log(sum); // 15 (sum of all node values)
```

### Querying the Tree

#### Finding a Node

```typescript
const foundNode = root.find((node) => node.value === 5);
console.log(foundNode?.value); // 5
```

#### Getting the Path to a Node

```typescript
const path = root.getPathOfNode((node) => node.value === 5);
if (path) {
  for (const node of path.preOrderIterator()) {
    console.log(node.value); // 1, 2, 5
  }
}
```

### Executing a Callback for Each Node

```typescript
root.forEach((node) => {
  console.log(node.value); // 4, 2, 5, 1, 3
});
```

## Available NPM Commands

### Build Project

```bash
npm run build
```

### Run Dev

```bash
npm run dev
```

### Run Tests

```bash
npm run test
```

### Run Lint

```bash
npm run lint
```

## Contributing

Contributions are welcome! If you have ideas for new features or improvements, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
