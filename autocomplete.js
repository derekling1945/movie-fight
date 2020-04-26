const createAutoComplete = ({ root, renderOption, onOptionSelect, inputValue, fetchData }) => {
  root.innerHTML = `
  <label><b>Search</b></label>
  <input class="input" />
  <div class="dropdown is-hide">
    <div class="dropdown-memu">
      <div class="dropdown-content results">
      </div>
    </div>
  </div>
  `;

  const input = root.querySelector('input');
  const dropdown = root.querySelector('.dropdown');
  const resultsWrapper = root.querySelector('.results');


  const onInput = async event => {
    const items = await fetchData(event.target.value);

    if (!items.length) {
      dropdown.classList.add('is-hide');
      return;
    }

    resultsWrapper.innerHTML = '';
    dropdown.classList.remove('is-hide');
    for(let item of items) {
      const option = document.createElement('a');
      
      option.classList.add('dropdown-item');
      option.innerHTML = renderOption(item);
      option.addEventListener('click', () => {
        dropdown.classList.add('is-hide');
        input.value = inputValue(item);
        onOptionSelect(item);
      });

      resultsWrapper.appendChild(option);
    }
  };

  input.addEventListener('input', debounce(onInput, 500));

  document.addEventListener('click', event => {
    if (!root.contains(event.target)) {
      dropdown.classList.add('is-hide');
    }
  });
}