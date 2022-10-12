import { useSnackbar, VariantType } from 'notistack';

export const useNotify = () => {
  const { enqueueSnackbar } = useSnackbar();
  const notify = (message: string, variant?: VariantType | undefined) => {
    enqueueSnackbar(message, {
      variant: variant ?? 'warning',
      autoHideDuration: 5000,
      anchorOrigin: { vertical: 'top', horizontal: 'right' },
    });
  };
  return { notify };
};
