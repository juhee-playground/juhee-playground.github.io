import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';

import FilterOption from './FilterOption';

const onChange = jest.fn();
const onToggleAll = jest.fn();
const title = 'Color';
const options = ['red', 'purple', 'yellow', 'orange', 'blueGrey', 'pink', 'cyan', 'green', 'blue'];
const color = 'red';
const selected = ['red', 'purple', 'yellow', 'orange', 'blueGrey', 'pink', 'cyan', 'green', 'blue'];

describe('FilterOption 테스트', () => {
  beforeEach(() => {
    onChange.mockClear();
    onToggleAll.mockClear();
  });

  it('title이 넘어온 값을 잘 나타내는지 확인한다.', () => {
    render(<FilterOption title={title} color={color} options={options} selected={selected} onChange={onChange} />);
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it('options 에 넘어온 리스트의 길이와 칩 개수가 동일한지 확인한다.', () => {
    render(<FilterOption title={title} color={color} options={options} selected={selected} onChange={onChange} />);
    const chipList = options.map(label => screen.getByRole('button', { name: label }));
    expect(chipList).toHaveLength(options.length);
  });

  it('options 에 넘어온 값과 칩의 이름이 동일한지 확인한다', () => {
    render(<FilterOption title={title} color={color} options={options} selected={selected} onChange={onChange} />);
    options.forEach(option => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });

  it('selected 에 넘어온 리스트의 칩 리스트의 칩들이 체크표시가 되 있는지 확인한다', () => {
    render(<FilterOption title={title} color={color} options={options} selected={selected} onChange={onChange} />);
    selected.forEach(label => {
      const chipButton = screen.getByRole('button', { name: label });
      expect(chipButton).toHaveTextContent(label);
      expect(chipButton).toHaveAttribute('aria-pressed', 'true');
    });
  });

  it('options에 있는 칩들을 클릭하면 onChange가 호출되는지 확인한다', () => {
    render(<FilterOption title={title} color={color} options={options} selected={selected} onChange={onChange} />);

    options.forEach(label => {
      const chipButton = screen.getByRole('button', { name: label });
      fireEvent.click(chipButton);
      expect(onChange).toHaveBeenCalledWith(label);
    });
  });

  it('전체가 선택된 경우 라벨을 누르면 전체 해제가 호출된다', () => {
    render(
      <FilterOption
        title={title}
        color={color}
        options={options}
        selected={selected}
        onChange={onChange}
        onToggleAll={onToggleAll}
      />,
    );

    const labelButton = screen.getByRole('button', { name: `${title} 전체 해제` });
    expect(labelButton).toHaveAttribute('aria-pressed', 'true');
    fireEvent.click(labelButton);
    expect(onToggleAll).toHaveBeenCalledTimes(1);
  });

  it('일부만 선택된 경우 라벨을 누르면 전체 선택이 호출된다', () => {
    render(
      <FilterOption
        title={title}
        color={color}
        options={options}
        selected={['red']}
        onChange={onChange}
        onToggleAll={onToggleAll}
      />,
    );

    const labelButton = screen.getByRole('button', { name: `${title} 전체 선택` });
    expect(labelButton).toHaveAttribute('aria-pressed', 'false');
    fireEvent.click(labelButton);
    expect(onToggleAll).toHaveBeenCalledTimes(1);
  });
});
