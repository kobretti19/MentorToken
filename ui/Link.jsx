/* eslint-disable react/prop-types */
import { Link } from "react-router";

export default function LinkNav({ children, ...props }) {
  return <Link {...props}>{children}</Link>;
}
