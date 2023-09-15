import './FilterCheckbox.css';

function FilterCheckbox(props) {
  console.log(props.checkboxValue);

  return (
    <div className='movies-filter'>
      <input
        type='checkbox'
        name='movies-filter'
        id='movies-filter'
        className='filter-checkbox'
        style={{ display: 'none' }}
        onChange={props.checkboxHandler}
        checked={props.checkboxValue}
      />
      <label htmlFor='movies-filter' className='toggle'></label>
      <p className='movies-filter__text'>Короткометражки</p>
    </div>
  );
}

export default FilterCheckbox;
