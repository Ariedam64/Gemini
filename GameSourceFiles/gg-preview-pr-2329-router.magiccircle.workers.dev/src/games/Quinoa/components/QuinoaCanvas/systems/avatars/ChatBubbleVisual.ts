import { Container, Graphics, Text, TextStyle } from 'pixi.js';

const PADDING_X = 8;
const PADDING_Y = 6;
const FONT_SIZE = 14;
const FONT_WEIGHT = '500';
const FONT_FAMILY = 'Greycliff CF, sans-serif';
const LINE_HEIGHT = FONT_SIZE * 1.2;
const MAX_WIDTH = 250;
const MIN_WIDTH = 40;
const BORDER_RADIUS = 12;
const TAIL_HEIGHT = 10;
const TAIL_WIDTH = 12;

export class ChatBubbleVisual extends Container {
  private background: Graphics;
  private shadow: Graphics;
  private text: Text;
  private _message: string = '';

  constructor() {
    super();

    this.shadow = new Graphics();
    this.addChild(this.shadow);

    this.background = new Graphics();
    this.addChild(this.background);

    this.text = new Text({
      text: '',
      style: new TextStyle({
        fontFamily: FONT_FAMILY,
        fontSize: FONT_SIZE,
        fontWeight: FONT_WEIGHT,
        fill: '#171717', // MagicBlack
        align: 'center',
        wordWrap: true,
        wordWrapWidth: MAX_WIDTH - PADDING_X * 2,
        lineHeight: LINE_HEIGHT,
      }),
    });
    this.text.anchor.set(0.5);
    this.addChild(this.text);

    this.visible = false;
  }

  showMessage(message: string, color: string): void {
    this._message = message;
    this.text.text = message;
    this.text.style.wordWrapWidth = MAX_WIDTH - PADDING_X * 2;

    const textWidth = this.text.width;
    const textHeight = this.text.height;

    const bubbleWidth = Math.max(textWidth + PADDING_X * 2, MIN_WIDTH);
    const bubbleHeight = textHeight + PADDING_Y * 2;

    this.redraw(bubbleWidth, bubbleHeight, color);

    // Position text in center of bubble
    // Bubble origin is bottom center (tip of tail)
    // Bubble rectangle starts at ( -width/2, -height - tailHeight )
    const bubbleCenterY = -TAIL_HEIGHT - bubbleHeight / 2;
    this.text.position.set(0, bubbleCenterY);

    this.visible = true;
  }

  hideMessage(): void {
    this.visible = false;
  }

  private redraw(width: number, height: number, color: string): void {
    const x = -width / 2;
    const y = -height - TAIL_HEIGHT;

    // Draw shadow
    this.shadow.clear();
    this.shadow.fillStyle = 'rgba(0,0,0,0.12)';
    this.drawBubbleShape(this.shadow, x, y + 3, width, height); // Offset Y by 3 for shadow
    this.shadow.fill();

    // Draw background
    this.background.clear();
    this.background.fillStyle = color;
    this.drawBubbleShape(this.background, x, y, width, height);
    this.background.fill();
  }

  private drawBubbleShape(
    g: Graphics,
    x: number,
    y: number,
    width: number,
    height: number
  ): void {
    g.beginPath();
    g.moveTo(x + BORDER_RADIUS, y);
    g.lineTo(x + width - BORDER_RADIUS, y);
    g.arcTo(x + width, y, x + width, y + BORDER_RADIUS, BORDER_RADIUS);
    g.lineTo(x + width, y + height - BORDER_RADIUS);
    g.arcTo(
      x + width,
      y + height,
      x + width - BORDER_RADIUS,
      y + height,
      BORDER_RADIUS
    );

    // Tail
    g.lineTo(x + width / 2 + TAIL_WIDTH / 2, y + height);
    g.lineTo(x + width / 2, y + height + TAIL_HEIGHT);
    g.lineTo(x + width / 2 - TAIL_WIDTH / 2, y + height);

    g.lineTo(x + BORDER_RADIUS, y + height);
    g.arcTo(x, y + height, x, y + height - BORDER_RADIUS, BORDER_RADIUS);
    g.lineTo(x, y + BORDER_RADIUS);
    g.arcTo(x, y, x + BORDER_RADIUS, y, BORDER_RADIUS);
    g.closePath();
  }
}
