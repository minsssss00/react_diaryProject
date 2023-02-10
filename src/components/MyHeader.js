const MyHeader = ({ headText, leftChild, rightChild }) => {
  return (
    <header>
      <div className='btn'>
        <div className='head_btn_left'>{leftChild}</div>
        <div className='head_btn_right'>{rightChild}</div>
        </div>
      <div className='head_text'>{headText}</div>
    </header>
  );
};

export default MyHeader;
