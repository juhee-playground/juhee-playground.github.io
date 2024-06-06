import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';

import ToggleChip from './ToggleChip';

const onChipSelect = jest.fn();
const pointColor = '#8c538d';

describe('ToggleChip 테스트', () => {
  beforeEach(() =>
    render(<ToggleChip label='chip' pointColor={pointColor} checked={true} clickable handleChipSelect={onChipSelect} />),
  );

  it('칩의 기본값은 선택이므로 체크 표시가 보이는지 확인한다.', () => {
    const checkIcon = screen.getByTestId('check-icon');
    expect(checkIcon).toBeInTheDocument();
  });

  it('체크 표시가 있는 상태일 때 칩을 클릭하면 체크표시가 사라진다.', () => {
    const button = screen.getByRole('button', { name: 'chip' });
    const checkIcon = screen.getByTestId('check-icon');
    fireEvent.click(button);
    expect(checkIcon).not.toBeVisible();
  });

  it('체크 표시가 없는 상태일 때 칩을 클릭하면 체크표시가 보인다.', () => {
    const button = screen.getByRole('button', { name: 'chip' });
    const checkIcon = screen.getByTestId('check-icon');
    fireEvent.click(button);
    expect(checkIcon).not.toBeVisible();
    fireEvent.click(button);
    const checkIcon2 = screen.getByTestId('check-icon');
    expect(checkIcon2).toBeVisible();
  });

  it('칩을 클릭했을 때 버튼의 이름을 넘겨주는지 확인한다.', () => {
    const button = screen.getByRole('button', { name: 'chip' });
    fireEvent.click(button);
    expect(onChipSelect).toHaveBeenCalledWith('chip');
  });
});
