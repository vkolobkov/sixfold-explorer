import { expect } from 'chai';
import { PriorityQueue } from '../../src/priorityQueue';

describe('Priority queue tests', () => {
  it(`Check queue with priority.`, () => {
    const numCompare = (a: number, b: number) => {
      return a - b;
    };
    const queue: PriorityQueue<number> = new PriorityQueue<number>(numCompare);
    queue.enqueue(10);
    queue.enqueue(2);
    queue.enqueue(1);
    queue.enqueue(8);
    queue.enqueue(5);

    expect(queue.dequeue()).to.equal(1);
    expect(queue.dequeue()).to.equal(2);
    expect(queue.dequeue()).to.equal(5);
    expect(queue.dequeue()).to.equal(8);
    expect(queue.dequeue()).to.equal(10);
  });
});