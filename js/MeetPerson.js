import { Component, Property } from "@wonderlandengine/api";

/**
 * MeetPerson
 */
export class MeetPerson extends Component {
  static TypeName = "MeetPerson";
  /* Properties that are configurable in the editor */
  static Properties = {
    param: Property.float(1.0),
    Panel: Property.object(),
    PanelText: Property.object(),
  };

  start() {
    console.log("start() with param", this.param);
    let animationComponent = this.object.getComponent("animation");
    if (animationComponent) {
      animationComponent.stop();
    } else {
      console.error("Animation component not found on object:", this.object.objectId);
    }
    this.collider = this.object.getComponent("collision");

    // Track whether currently colliding
    this.isColliding = false;

    // Initialize collision count
    this.collisionCount = 0;
  }

  update(dt) {
    /* Called every frame. */
    let overlaps = this.collider.queryOverlaps();

    if (overlaps.length > 0) {
      if (!this.isColliding) {
        // Start animation on first collision
        this.isColliding = true;

        // Increment collision count
        this.collisionCount += 1;

        let animationComponent = this.object.getComponent("animation");
        animationComponent.play();
        // if (animationComponent) {
        //   animationComponent.play();
        // } else {
        //   console.error("Animation component not found on object:", this.object.objectId);
        // }

        // Log if exactly 4 collisions encountered
        if (this.collisionCount === 3) {
          console.log(`Object ${this.object.objectId} has encountered exactly 3 collisions.`);
          this.PanelText.active = true;
          this.Panel.active = true;
        }
      }
    } else {
      if (this.isColliding) {
        // Stop animation when no longer colliding
        this.isColliding = false;
        let animationComponent = this.object.getComponent("animation");
        animationComponent.stop();
        // if (animationComponent) {
        //   animationComponent.stop();
        // } else {
        //   console.error("Animation component not found on object:", this.object.objectId);
        // }
      }
    }
  }
}
