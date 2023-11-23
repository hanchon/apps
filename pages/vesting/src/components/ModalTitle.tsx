export function ModalTitle({ title }: { title: string }) {
  return (
    <div className="text-darkGray2 mb-4 w-[calc(100%-32px)] text-lg font-bold">
      {title}
    </div>
  );
}
