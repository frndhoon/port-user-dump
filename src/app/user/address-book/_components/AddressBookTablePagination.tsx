import { ChevronLeft, ChevronRight } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Pagination, PaginationItem, PaginationLink, PaginationContent } from '@/components/ui/pagination';
import { cn } from '@/lib/utils';

/**
 * @component 주소록 테이블 페이지네이션 컴포넌트
 * @author 우정훈
 * @description 주소록 테이블 하단에 페이지를 표시하는 컴포넌트입니다.
 * @param previousPage 이전 페이지
 * @param nextPage 다음 페이지
 * @param nowPage 현재 페이지
 * @param pageSize 페이지 당 행 수
 * @param totalRows 총 행 수
 * @param onPageChange 페이지 변경 핸들러
 */

interface AddressBookTablePaginationProps {
	nowPage: number;
	pageSize: number;
	totalRows: number;
	onPageChange: (zeroIndexPage: number) => void;
}

const AddressBookTablePagination = ({ nowPage, pageSize, totalRows, onPageChange }: AddressBookTablePaginationProps) => {
	const totalPage = Math.ceil(totalRows / pageSize);

	// 0 index
	const currentPageGroup = Math.floor(nowPage / 10);
	const startPage = currentPageGroup * 10;
	const endPage = Math.min(startPage + 9, totalPage - 1);

	const shownPageList = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);

	return (
		<Pagination>
			<PaginationContent className="gap-[1rem] [&_a]:h-[3.2rem] [&_a]:w-[3.2rem] [&_button]:h-[3.2rem] [&_button]:w-[3.2rem] [&_button]:hover:bg-[#EDEDED]">
				{/* 이전 페이지 버튼 */}
				<div className="flex flex-row gap-0">
					<PaginationItem>
						<Button
							disabled={nowPage < 10}
							variant="outline"
							className="rounded-l-[0.5rem] rounded-r-none border-r-0"
							onClick={() => onPageChange(Math.max(0, nowPage - 10))}
						>
							<ChevronLeft />
							<ChevronLeft className="-ml-4" />
						</Button>
					</PaginationItem>
					<PaginationItem>
						<Button
							disabled={nowPage <= 0}
							variant="outline"
							className="rounded-l-none rounded-r-[0.5rem]"
							onClick={() => onPageChange(nowPage - 1)}
						>
							<ChevronLeft />
						</Button>
					</PaginationItem>
				</div>

				{/* 현재 표시되는 페이지 버튼 (최대 10페이지) */}
				{shownPageList.map(page => (
					<PaginationItem key={page}>
						<PaginationLink
							className={cn(
								'hover:text-foreground cursor-pointer rounded-[0.5rem] text-[1.4rem] text-[#6D6D6D] hover:bg-[#EDEDED]',
								nowPage === page && 'text-foreground bg-[#EDEDED]',
							)}
							onClick={() => onPageChange(page)}
						>
							{page + 1}
						</PaginationLink>
					</PaginationItem>
				))}

				{/* 다음 페이지 버튼 */}
				<div className="flex flex-row gap-0">
					<PaginationItem>
						<Button
							disabled={nowPage >= totalPage - 1}
							variant="outline"
							className="rounded-l-[0.5rem] rounded-r-none border-r-0"
							onClick={() => onPageChange(nowPage + 1)}
						>
							<ChevronRight />
						</Button>
					</PaginationItem>
					<PaginationItem>
						<Button
							disabled={nowPage >= totalPage - 10}
							variant="outline"
							className="flex flex-row rounded-l-none rounded-r-[0.5rem]"
							onClick={() => onPageChange(Math.min(totalPage - 1, nowPage + 10))}
						>
							<ChevronRight />
							<ChevronRight className="-ml-4" />
						</Button>
					</PaginationItem>
				</div>
			</PaginationContent>
		</Pagination>
	);
};

export default AddressBookTablePagination;
