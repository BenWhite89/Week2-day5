$(function() {

  let counter = 0;

  class Shape {
    height: number;
    width: number;
    name: string;
    index: number;
    area: number;
    perimeter: number;
    shape = this;
    constructor(height: number, width: number) {
      this.height = height;
      this.width = width;
      this.index = counter
    }
    describe() {
      $(`.op-name`).append(this.name);
      $(`.op-width`).append(this.width.toString());
      $(`.op-height`).append(this.height.toString());
      $(`.op-radius`).append('');
      $(`.op-area`).append(this.area.toLocaleString('en', {useGrouping:true}));
      $(`.op-perimeter`).append((this.perimeter).toLocaleString('en', {useGrouping:true}));
    }
    draw() {
      let x = Math.floor(Math.random() * (600-this.width)),
          y = Math.floor(Math.random() * (600-this.height));

        $(".display-area").append(`<div id=${this.index} class='shape ${this.name}'></div>`);
        $(`#${this.index}`).css({
          'top': x,
          'left': y,
          'height': `${this.height}px`,
          'width': `${this.width}px`,
          'z-index': this.index
        });
        $(`#${this.index}`).click((event) => {
          $(`.op-name`).empty();
          $(`.op-width`).empty();
          $(`.op-height`).empty();
          $(`.op-radius`).empty();
          $(`.op-area`).empty();
          $(`.op-perimeter`).empty();
          this.describe();
        });
        $(`#${this.index}`).dblclick( (event) => {
          $(`#${this.index}`).remove();
        })
        counter++
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
      this.area = Math.round((Math.PI * Math.pow(radius, 2) * 100)) / 100;
      this.perimeter = Math.round((Math.PI * radius * 2) * 100) / 100;
    }
    describe() {
      super.describe();
      let r = this.radius.toString();
      $('.op-height').empty();
      $('.op-width').empty();
      $(`.op-radius`).append(r);
    }
  }

  class Triangle extends Shape {
    base: number;
    constructor(base: number) {
      super(base, base);
      this.name = 'Isoceles Right Triangle';
      this.height = base;
      this.width = base;
      this.area = base * base / 2;
      this.perimeter = Math.round(2 * base + Math.sqrt(Math.pow(base, 2) * 2) * 100) / 100;
    }
    draw() {
      super.draw();
      $(`#${this.index}`).css({
        'height': '0px',
        'width': '0px',
        'border-bottom-width': `${this.height}px`,
        'border-right-width': `${this.height}px`,
      });
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