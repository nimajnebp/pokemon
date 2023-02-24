import Button from "@mui/joy/Button";
import { useNavigate } from "react-router-dom";

/** Main function. */
function BackButton() {
  const navigate = useNavigate();
  const handleBack = () => navigate(-1);

  return <Button onClick={handleBack}>Go Back</Button>;
}

/** Exports. */
export default BackButton;
