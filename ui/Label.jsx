// eslint-disable-next-line react/prop-types
export default function Label({ children, ...props }) {
  return (
    <label
      className="absolute left-4 top-4 origin-[0] -translate-y-3 scale-75 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3 peer-focus:scale-75 duration-150"
      {...props}
    >
      {children}
    </label>
  );
}
