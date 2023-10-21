// Layout
export default async function layout(props: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      <div>{props.children}</div>
      {props.modal}
    </>
  );
}
