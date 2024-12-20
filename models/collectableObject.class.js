class CollectableObject extends MovableObject {

    collected = false;

    collect() {
        this.collected = true;
    }
}