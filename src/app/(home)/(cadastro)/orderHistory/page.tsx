export default function OrderHistory() {
  return (
    <section className="w-[983px] flex flex-col py-14">
      <div className="m-auto flex flex-col w-[800px]  h-full">
        <span className="font-bold text-3xl mb-10">Histórico do pedido</span>
        <div className="flex w-full gap-32 border-b-[0.0625rem] border-black">
          <span>Número</span>
          <span>Data</span>
          <span>Total</span>
          <span>Status</span>
        </div>
      </div>
    </section>
  );
}
