import './../../assets/styles/sort-button.scss';

export class SortButton {
  constructor(text, onClickCallback, sortFunction) {
    this._onClick = this._onClick.bind(this);

    this._text = text;
    this._onClickCallback = onClickCallback;
    this._sortFunction = sortFunction;    
  }

  _onClick() {
    this._onClickCallback(this._sortFunction);
  }

  render() {
    const button = document.createElement('button');
    button.setAttribute('class', 'button-sort');

    const text = document.createTextNode(this._text);

    button.appendChild(text);
    button.addEventListener('click', this._onClick);
    return button;
  }
}