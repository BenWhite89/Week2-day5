$(function() {

  class Shape {
    height: number;
    width: number;
    trHeight: number;
    trWidth: number;
    x: number;
    y: number;
    name: string;
    area: number;
    perimeter: number;
    constructor(height: number, width: number) {
      this.height = height;
      this.width = width;
      this.x = width;
      this.y = height;
    }
    describe() {
      $(`.op-name`).text(this.name);
      $(`.op-width`).text(this.width);
      $(`.op-height`).text(this.height);
      $(`.op-radius`).text('');
      $(`.op-area`).text(this.area);
      $(`.op-perimeter`).text(this.perimeter);
    }
    draw() {
      let x = Math.floor(Math.random() * (600-this.x)),
          y = Math.floor(Math.random() * (600-this.y));

        $(".display-area").append(
          $(`<div class='shape ${this.name}'></div>`)
          .css({
            'top': y,
            'left': x,
            'height': `${this.height}px`,
            'width': `${this.width}px`,
            'border-bottom-width': `${this.trHeight}px`,
            'border-right-width': `${this.trWidth}px`,
          })
          .click((event) => {
            $(`.op-name`).empty();
            $(`.op-width`).empty();
            $(`.op-height`).empty();
            $(`.op-radius`).empty();
            $(`.op-area`).empty();
            $(`.op-perimeter`).empty();
            this.describe();
          })
          .dblclick( function(event) {
            this.remove();
          })
        )
    }
  }

  class Rectangle extends Shape {
    constructor (height: number, width: number) {
      super(height, width);
      this.name = 'Rectangle';
      this.area = height * width;
      this.perimeter = 2 * (height + width);
    }
  }

  class Square extends Rectangle {
    side: number;
    constructor (side: number) {
      super(side, side);
      this.height = side;
      this.width = side;
      this.name = 'Square';
    }
  }

  class Circle extends Shape {
    radius: number;
    constructor(radius: number) {
      super(radius, radius);
      this.name = 'Circle';
      this.radius = radius;
      this.height = 2 * radius;
      this.width = 2 * radius;
      this.x = 2 * radius;
      this.y = 2 * radius;
      this.area = Math.round((Math.PI * Math.pow(radius, 2) * 100)) / 100;
      this.perimeter = Math.round((Math.PI * radius * 2) * 100) / 100;
    }
    describe() {
      super.describe();
      $('.op-height').empty();
      $('.op-width').empty();
      $(`.op-radius`).text(this.radius);
    }
  }

  class Triangle extends Shape {
    base: number;
    constructor(base: number) {
      super(base, base);
      this.name = 'Isoceles Right Triangle';
      this.trHeight = base;
      this.trWidth = base;
      this.height = 0;
      this.width = 0;
      this.x = base;
      this.y = base;
      this.area = base * base / 2;
      this.perimeter = Math.round(2 * base + Math.sqrt(Math.pow(base, 2) * 2) * 100) / 100;
    }
    describe() {
      super.describe();
      $('.op-height').text(this.trHeight);
      $('.op-width').text(this.trWidth);
    }
  }

  $(`#rectangle-form`).on('submit', (event) => {
    event.preventDefault();
    let height = Number($(`#rectangle-height`).val()),
        width = Number($(`#rectangle-width`).val()),
        newRec = new Rectangle(height, width);

      newRec.draw();
  })

  $(`#square-form`).on('submit', (event) => {
    event.preventDefault();
    let height = Number($(`#square-height`).val()),
        newSq = new Square(height);

    newSq.draw();
  })

  $(`#circle-form`).on('submit', (event) => {
    event.preventDefault();
    let radius = Number($(`#circle-height`).val()),
        newCir = new Circle(radius);

    newCir.draw();
  })

  $(`#triangle-form`).on('submit', (event) => {
    event.preventDefault();
    let height = Number($(`#triangle-height`).val()),
        newTri = new Triangle(height);

    newTri.draw();
  })

})