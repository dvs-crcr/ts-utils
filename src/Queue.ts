type queueNodeType = {
  value: unknown,
  next: queueNodeType | null, 
  prev: queueNodeType | null
} | null;

export default class Queue {
  public size: number = 0;
  public head: queueNodeType = null;
  public tail: queueNodeType = null;

  push<T>(value: T): number {
    const prev = this.tail;
    const node: queueNodeType = { value, next: null, prev };
    if (this.isEmpty()) {
      this.head = node;
      this.tail = node;
    } else {
      if (prev !== null) {
        prev.next = node;
      }
      this.tail = node;
    }
    return ++this.size;
  }
  
  pull() {
    if (this.isEmpty()) {
      throw new Error('Queue is empty...');
    } else {
      const top = this.peek();
      if (this.size > 1) {
        if (top !== null && top.next !== null) {
          top.next.prev = null;
          this.head = top.next;
          this.size--;
        }
      } else {
        this.size = 0;
        this.head = null;
        this.tail = null;
      }
      return top;
    }
  }
  
  peek = () => this.head
  
  isEmpty = () => this.size === 0
}