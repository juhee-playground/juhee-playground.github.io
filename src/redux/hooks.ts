// app/hooks.ts //

import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';

import type { TRootState, TAppDispatch } from './store';

// 그냥 useDispatch와 useSelector를 쓰지말고 이걸 불러서 사용하자.
export const useAppDispatch: () => TAppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;
