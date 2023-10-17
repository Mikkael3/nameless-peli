import Phaser from "phaser";

class Peli extends Phaser.Scene {
  pisteet: number = 0;
  points?: Phaser.GameObjects.Text;
  preload() {
    this.load.image("logo", "oran.png");
    this.load.image("enemy", "bär.webp");
  }

  create() {
    this.points = this.add.text(600, 50, "Pisteet: " + this.pisteet);
    let speed = 100;

    const logo = this.physics.add.image(200, 50, "logo");
    logo.displayHeight = 64;
    logo.displayWidth = 64;
    logo.setVelocity(speed, speed * 2);
    logo.setBounce(1, 1);
    logo.setCollideWorldBounds(true);
    logo.setInteractive();

    const enemy = this.physics.add.image(400, 100, "enemy");
    enemy.setInteractive();
    enemy.displayHeight = 64;
    enemy.displayWidth = 64;
    enemy.setVelocity(speed, speed * 2);
    enemy.setBounce(1, 1);
    enemy.setCollideWorldBounds(true);

    this.input.on("gameobjectdown", (_pointer: any, obj: any) => {
      if (obj === enemy) {
        alert("hävisit pelin pisteesi oli " + this.pisteet);
        this.pisteet = 0;
        speed = 100;
      } else {
        speed += 50;
        this.pisteet++;
        if (this.points) this.points.text = "Pisteet: " + this.pisteet;
      }
      enemy.setVelocity(speed, speed * 2);
      logo.setVelocity(speed, speed * 2);
    });
  }
}

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: Peli,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
    },
  },
};

new Phaser.Game(config);
