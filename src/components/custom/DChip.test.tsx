import '@testing-library/jest-dom';
import { render, screen, fireEvent, queryByTestId } from '@testing-library/react';
import DChip from './DChip';

const onChipSelect = jest.fn();
const filters = ['chip'];
const emptyFilters: string[] | undefined = [];

describe('DChip 테스트', () => {
  it('칩이 Clickable 하고 필터 안에 있으면 체크 표시가 보인다.', () => {
    render(<DChip label='chip' selectedItems={filters} clickable handleChipSelect={onChipSelect} />);
    const button = screen.getByRole('button', { name: 'chip' });
    expect(button).toBeEnabled();
    const checkIcon = screen.getByTestId('check-icon');
    expect(checkIcon).toBeInTheDocument();
  });

  it('칩이 Clickable 하고 필터 안에 없으면 체크 표시가 안보인다.', () => {
    render(<DChip label='chip' selectedItems={emptyFilters} clickable handleChipSelect={onChipSelect} />);
    const button = screen.getByRole('button', { name: 'chip' });
    expect(button).toBeEnabled();

    const checkIcon = queryByTestId(button, 'check-icon');
    expect(checkIcon).toBeNull();
  });

  it('칩이 Clickable 하지 않으면 버튼을 클릭할 수 없다.', () => {
    render(<DChip label='noClickable' />);
    const button = screen.getByRole('button', { name: 'noClickable' });
    fireEvent.click(button);
    expect(onChipSelect).not.toHaveBeenCalled();
  });

  it('칩을 클릭했을 때 버튼의 이름을 넘겨주는지 확인한다.', () => {
    render(<DChip label='chip' selectedItems={filters} clickable handleChipSelect={onChipSelect} />);
    const button = screen.getByRole('button', { name: 'chip' });
    fireEvent.click(button);
    expect(onChipSelect).toHaveBeenCalledWith('chip');
  });

  it('필터에 값이 없을면 칩을 클릭했을 때 체크 아이콘이 생기는 걸 확인 한다.', () => {
    render(<DChip label='chip' selectedItems={emptyFilters} clickable handleChipSelect={onChipSelect} />);
    const button = screen.getByRole('button', { name: 'chip' });
    fireEvent.click(button);
    const checkIcon = screen.getByTestId('check-icon');
    expect(onChipSelect).toHaveBeenCalledWith('chip');
    expect(checkIcon).toBeVisible();
  });

  it('필터에 값이 있을때 칩을 클릭하면 체크 아이콘이 사라지는 걸 확인 한다.', () => {
    render(<DChip label='chip' selectedItems={filters} clickable handleChipSelect={onChipSelect} />);
    const button = screen.getByRole('button', { name: 'chip' });
    fireEvent.click(button);
    const checkIcon = queryByTestId(button, 'check-icon');
    expect(checkIcon).toBeNull();
  });
});
