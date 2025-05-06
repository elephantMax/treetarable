import { BinaryTree } from '../src'
import { describe, expect, test } from 'vitest'

describe('BinaryTree', () => {
  test('should create a binary tree node', () => {
    const node = new BinaryTree(1)
    expect(node.value).toBe(1)
    expect(node.left).toBeNull()
    expect(node.right).toBeNull()
  })

  test('should traverse the tree in depth-first order (default)', () => {
    const root = new BinaryTree(1)
    root.left = new BinaryTree(2)
    root.right = new BinaryTree(3)
    root.left.left = new BinaryTree(4)
    root.left.right = new BinaryTree(5)

    const values = [...root].map((node) => node.value)
    expect(values).toEqual([4, 2, 5, 1, 3])
  })

  test('should traverse the tree in breadth-first order', () => {
    const root = new BinaryTree(1)
    root.left = new BinaryTree(2)
    root.right = new BinaryTree(3)
    root.left.left = new BinaryTree(4)
    root.left.right = new BinaryTree(5)

    const values = [...root.bfIterator()].map((node) => node.value)
    expect(values).toEqual([1, 2, 3, 4, 5])
  })

  test('should traverse the tree in pre-order', () => {
    const root = new BinaryTree(1)
    root.left = new BinaryTree(2)
    root.right = new BinaryTree(3)
    root.left.left = new BinaryTree(4)
    root.left.right = new BinaryTree(5)

    const values = [...root.preOrderIterator()].map((node) => node.value)
    expect(values).toEqual([1, 2, 4, 5, 3])
  })

  test('should traverse the tree in post-order', () => {
    const root = new BinaryTree(1)
    root.left = new BinaryTree(2)
    root.right = new BinaryTree(3)
    root.left.left = new BinaryTree(4)
    root.left.right = new BinaryTree(5)

    const values = [...root.postOrderIterator()].map((node) => node.value)
    expect(values).toEqual([4, 5, 2, 3, 1])
  })

  test('should map values in the tree', () => {
    const root = new BinaryTree(1)
    root.left = new BinaryTree(2)
    root.right = new BinaryTree(3)

    const newTree = root.map((value) => value * 2)
    const values = [...newTree].map((node) => node.value)
    expect(values).toEqual([4, 2, 6])
  })

  test('should find a node in the tree', () => {
    const root = new BinaryTree(1)
    root.left = new BinaryTree(2)
    root.right = new BinaryTree(3)

    const foundNode = root.find((node) => node.value === 2)
    expect(foundNode?.value).toBe(2)

    const notFoundNode = root.find((node) => node.value === 4)
    expect(notFoundNode).toBeNull()
  })

  test('should execute a callback for each node', () => {
    const root = new BinaryTree(1)
    root.left = new BinaryTree(2)
    root.right = new BinaryTree(3)

    const values: number[] = []
    root.forEach((node) => values.push(node.value))
    expect(values).toEqual([2, 1, 3])
  })

  test('should flatten the tree into an array', () => {
    const root = new BinaryTree(1)
    root.left = new BinaryTree(2)
    root.right = new BinaryTree(3)

    const flatNodes = root.flat()
    const values = flatNodes.map((node) => node.value)
    expect(values).toEqual([2, 1, 3])
  })

  test.todo('should filter tree')

  test('should get the path to a node', () => {
    const root = new BinaryTree(1)
    root.left = new BinaryTree(2)
    root.right = new BinaryTree(3)
    root.left.left = new BinaryTree(4)
    root.left.right = new BinaryTree(5)

    const path = root.getPathOfNode((node) => node.value === 5)

    const values = path
      ? [...path.preOrderIterator()].map((node) => node.value)
      : []

    expect(values).toEqual([1, 2, 5])
  })

  test('should calculate the sum of tree values using reduce method without initialValue', () => {
    const root = new BinaryTree(1)
    root.left = new BinaryTree(2)
    root.right = new BinaryTree(3)
    root.left.left = new BinaryTree(4)
    root.left.right = new BinaryTree(5)

    const sumNode = root.reduce(
      (prev, curr) => new BinaryTree(prev.value + curr.value),
    )

    expect(sumNode).toEqual(new BinaryTree(15))
  })

  test('should calculate the sum of tree values using reduce method with initialValue', () => {
    const root = new BinaryTree(1)
    root.left = new BinaryTree(2)
    root.right = new BinaryTree(3)
    root.left.left = new BinaryTree(4)
    root.left.right = new BinaryTree(5)

    const sum = root.reduce((prev, curr) => prev + curr.value, 0)

    expect(sum).toEqual(15)
  })
})
