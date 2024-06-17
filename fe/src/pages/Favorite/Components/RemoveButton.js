import { Button } from "antd";
import { FAVORITE_API } from "../../../services/constant";
import { customToast } from "../../../toasts";
import { sendRequest } from "../../../services/sendRequest";

const RemoveButton = ({ title, ...props }) => {
    return (<>
        <Button
            {...props}
        >
            {title}
        </Button>
    </>);
}

export default RemoveButton;