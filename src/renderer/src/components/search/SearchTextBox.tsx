import { Component, onMount, Setter, Signal } from 'solid-js';
import { faSearch, faXmark } from "@fortawesome/free-solid-svg-icons";
import "../../assets/css/search/search-text-box.css";
import Fa from 'solid-fa';
import { globalIconScale } from '../../App';



type SearchTextBoxProps = {
  value: Signal<string>,
  setInput: Setter<HTMLElement | undefined>,
}

const SearchTextBox: Component<SearchTextBoxProps> = props => {
  const [value, setValue] = props.value;
  let input;

  onMount(() => {
    props.setInput(input);
    input.textContent = value();
  });

  const onInput = () => {
    setValue(input.textContent.replaceAll(String.fromCharCode(160), String.fromCharCode(32)) ?? "");
  };

  const onPaste = evt => {
    const selection = window.getSelection();
    if (selection === null) {
      return;
    }

    evt.stopPropagation();
    evt.preventDefault();

    selection.deleteFromDocument();
    selection.getRangeAt(0).insertNode(document.createTextNode(evt.clipboardData.getData("Text")));
    selection.collapseToEnd();

    onInput();
  };

  const clear = () => {
    input.textContent = "";
    onInput();
    input.focus();
  };

  return (
    <div class="search-text-box button-like">
      <Fa icon={faSearch} scale={globalIconScale}/>
      <div class="editable" ref={input} onInput={onInput} onPaste={onPaste} contenteditable={true} spellcheck={false}></div>
      <button class="icon" onClick={clear}>
        <Fa icon={faXmark} scale={globalIconScale}/>
      </button>
    </div>
  );
};



export default SearchTextBox;