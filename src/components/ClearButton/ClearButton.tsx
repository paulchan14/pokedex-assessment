import { colors } from '../../utils/colors';
import React from 'react';
import { MdClear } from 'react-icons/md';

export interface ClearButtonProps {
  onClick: () => void;
  styles: string;
}

export const ClearButton: React.FC<ClearButtonProps> = ({
  onClick,
  styles,
}) => (
  <MdClear
    size="3em"
    fill={colors.background}
    className={styles}
    onClick={onClick}
    aria-role="button"
  />
);
