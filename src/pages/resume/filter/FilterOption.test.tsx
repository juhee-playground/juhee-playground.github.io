import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import FilterOption from './FilterOption';

const onChange = jest.fn();
const title = 'Color';
const options = ['red', 'purple', 'yellow', 'orange', 'blueGrey', 'pink', 'cyan', 'green', 'blue'];
const pointColor = 'red';
const selected = ['red', 'purple', 'yellow', 'orange', 'blueGrey', 'pink', 'cyan', 'green', 'blue'];

describe('FilterOption 테스트', () => {
  it('title이 넘어온 값을 잘 나타내는지 확인한다.', () => {
    render(<FilterOption title={title} pointColor={pointColor} options={options} selected={selected} onChange={onChange} />);
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it('options 에 넘어온 리스트의 길이와 칩 개수가 동일한지 확인한다.', () => {
    render(<FilterOption title={title} pointColor={pointColor} options={options} selected={selected} onChange={onChange} />);
    const coutOfChip = options.length;
    const chipList = screen.getAllByRole('button');
    expect(coutOfChip).toBe(chipList.length);
  });

  it('options 에 넘어온 값과 칩의 이름이 동일한지 확인한다', () => {
    render(<FilterOption title={title} pointColor={pointColor} options={options} selected={selected} onChange={onChange} />);
    options.forEach(option => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });

  it('selected 에 넘어온 리스트의 칩 리스트의 칩들이 체크표시가 되 있는지 확인한다', () => {
    render(<FilterOption title={title} pointColor={pointColor} options={options} selected={selected} onChange={onChange} />);
    selected.forEach(label => {
      const chipButton = screen.getByRole('button', { name: label });
      expect(chipButton).toHaveTextContent(label);
      // aria-pressed 속성으로 토글 상태 확인
      expect(chipButton).toHaveAttribute('aria-pressed', 'true');
    });
  });

  it('options에 있는 칩들을 클릭하면 onChange가 호출되는지 확인한다', () => {
    render(<FilterOption title={title} pointColor={pointColor} options={options} selected={selected} onChange={onChange} />);

    options.forEach(label => {
      const chipButton = screen.getByRole('button', { name: label });
      fireEvent.click(chipButton);
      expect(onChange).toHaveBeenCalledWith(label, title); // 호출된 인자가 맞는지 확인
    });
  });

});
