import { useDeleteAddressBook } from '@/api/tanstack-query/useAddressBook';
import useDialog from '@/components/hooks/useDialog';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';

/**
 * @component 주소록 삭제 확인 다이얼로그 컴포넌트
 * @author 우정훈
 * @description 주소록 삭제 확인을 담당하는 다이얼로그 컴포넌트입니다.
 * @param id 주소록 그룹 아이디
 */

const DeleteConfirmDialog = ({ id }: { id: number }) => {
	const { isDialogOpen, handleDialogChange } = useDialog();

	const { mutateAsync: deleteAddressBook, isPending: isDeleting } = useDeleteAddressBook(id);

	const handleDelete = async () => {
		try {
			await deleteAddressBook({});
			// eslint-disable-next-line unused-imports/no-unused-vars
		} catch (error) {
			// 훅에서 error toast 처리
		}
	};

	const handleOpenChange = (open: boolean) => {
		handleDialogChange(open);
	};

	return (
		<Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
			<DialogTrigger asChild>
				<Button variant="delete" size="delete" onClick={e => e.stopPropagation()}>
					삭제
				</Button>
			</DialogTrigger>
			<DialogContent
				className="flex h-[16.7rem] w-[46rem] flex-col items-center justify-center gap-[2rem] rounded-[1.5rem] p-[2rem] sm:max-w-[46rem]"
				showCloseButton={false}
			>
				<DialogHeader>
					<DialogTitle className="text-[1.7rem]">그룹을 삭제하시겠습니까?</DialogTitle>
				</DialogHeader>
				<DialogFooter className="flex flex-row items-center justify-center gap-[1rem]">
					<Button
						variant="outline"
						className="h-[4.1rem] w-[9rem] rounded-[1rem] px-[1.5rem] py-[1rem] text-[1.7rem] font-bold"
						onClick={() => handleDialogChange(false)}
						disabled={isDeleting}
					>
						취소
					</Button>
					<Button
						className="bg-secondary hover:bg-secondary/80 h-[4.1rem] w-[9rem] rounded-[1rem] px-[1.5rem] py-[1rem] text-[1.7rem] font-bold"
						onClick={handleDelete}
						disabled={isDeleting}
					>
						{isDeleting ? '삭제 중...' : '삭제'}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default DeleteConfirmDialog;
