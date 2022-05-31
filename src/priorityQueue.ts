class PriorityQueue<T>{
  private queue: Array<T>;
  private compearer: (a: T, b: T) => number;

  constructor(_compearer: (a: T, b: T) => number) {
    this.queue = [];
    this.compearer = _compearer;
  }

  enqueue(element: T): void {
    let start = 0;
    let end = this.queue.length - 1;
    let indexToInsert = -1;
    while (start <= end) {
      let pivot = (start + end) >> 1;
      let compareResult = this.compearer(element, this.queue[pivot]);
      if (compareResult > 0) {
        start = pivot + 1;
      } else if (compareResult < 0) {
        end = pivot - 1;
      } else {
        indexToInsert = pivot;
        break;
      }
    }
    if (indexToInsert === -1) {
      indexToInsert = start;
    }

    this.queue.splice(indexToInsert, 0, element);
  }

  dequeue(): T {
    const element = this.queue[0];
    this.queue.splice(0, 1);
    return element;
  }

}

export { PriorityQueue };