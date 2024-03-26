import './style.css';

import Image from '../Image/Image';
import StarEmpty from '../../imgs/star_empty.png';
import StarFilled from '../../imgs/star_filled.png';
import { Rate } from '../../types/StarRate';

const RATE_NUMBER = (index: number) => ((index + 1) * 2) as Rate;

interface EachStarProps {
  index: number;
  setScore: (score: Rate) => void;
}

class EachStar {
  private template: HTMLDivElement;

  private active: boolean;

  constructor({ index, setScore }: EachStarProps) {
    const rate = document.createElement('div');
    rate.id = `rate${RATE_NUMBER(index)}`;
    rate.className = 'rate-icon';
    rate.appendChild(this.createStar({ index, setScore }));
    rate.appendChild(this.createStarInput(index));
    this.template = rate;
    this.active = false;
  }

  get element() {
    return this.template;
  }

  private createStar({ index, setScore }: EachStarProps) {
    const label = document.createElement('label');
    label.htmlFor = `rate-input${RATE_NUMBER(index)}`;
    const starImage = this.createStarImage({ index, setScore });
    label.appendChild(starImage.element);
    return label;
  }

  private createStarImage({ index, setScore }: EachStarProps) {
    const image = new Image({
      src: StarEmpty,
      alt: 'star-icon',
      classname: [`${RATE_NUMBER(index)}`],
      onImageClick: () => setScore(RATE_NUMBER(index)),
    });
    return image;
  }

  private changeStarImage() {
    this.template.querySelector('img')?.setAttribute('src', this.active ? StarFilled : StarEmpty);
  }

  private setActive(active: boolean) {
    this.active = active;
    this.changeStarImage();
  }

  fillStars(index: number) {
    this.setActive(index >= Number(this.template.querySelector('img')?.className));
  }

  emptyStars(index: number) {
    this.setActive(index <= Number(this.template.querySelector('img')?.className));
  }

  private createStarInput(index: number) {
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'rating';
    input.value = `${RATE_NUMBER(index)}`;
    input.id = `rate-input${RATE_NUMBER(index)}`;
    return input;
  }
}

export default EachStar;