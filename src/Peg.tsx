export interface PegProps {
  color: string
  offsetTop?: number
  removeSelf: () => void
  runAnimation: boolean
}



export const Peg: React.FC<PegProps> = (props: PegProps) => {
  // If offsetTop is provided, start the element at that vertical position.
  let offsetTop = props.offsetTop != undefined ? `${props.offsetTop}%` : undefined;

  return <div
    className={props.runAnimation ? 'peg' : undefined}
    style={{
      width: '100%',
      backgroundColor: props.color,
      height: '0.5%',
      position: "absolute",
      top: offsetTop,
      margin: 'auto',
    }}
    onAnimationEnd={() => {
      // Inform parent to remove this peg when animation completes
      props.removeSelf();
    }}
  ></div>;
};
