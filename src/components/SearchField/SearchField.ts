import Button from '../Button/Button';
import './style.css';

interface SearchFieldProps {
  onSearch?: (event: SubmitEvent) => void;
}
class SearchField {
  private template: HTMLFormElement;

  constructor(props: SearchFieldProps) {
    const { onSearch } = props;
    this.template = this.createSearchField();
    this.createElements();
    if (typeof onSearch !== 'undefined') this.setEventListener(onSearch);
  }

  private createSearchField() {
    const searchField = document.createElement('form');
    searchField.className = 'search-box';
    return searchField;
  }

  private createElements() {
    this.createInputElement();
    this.createButtonElement();
  }

  private createInputElement() {
    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.name = 'query';
    input.maxLength = 30;
    input.placeholder = '검색어를 입력하세요';
    this.template.appendChild(input);
  }

  private createButtonElement() {
    const button = new Button({
      className: ['search-button'],
      text: '검색',
    });

    this.template.appendChild(button.element);
  }

  private setEventListener(onSearch: (event: SubmitEvent) => void) {
    this.template.addEventListener('submit', onSearch);
  }

  get element() {
    return this.template;
  }
}

export default SearchField;
