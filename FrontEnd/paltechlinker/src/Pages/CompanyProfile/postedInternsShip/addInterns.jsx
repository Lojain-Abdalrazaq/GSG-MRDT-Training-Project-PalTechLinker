import CustomButton from "../../../CommonComponents/CustomButton";
import { Box } from "@mui/system";
const AddInterns = () => { 
    return (
        <Box 
            mt={8} 
            mb={8} 
            display="flex" 
            justifyContent="center" 
        >
            <CustomButton 
                text="Add Interns" 
                fullWidth={false} 
                sx={{
                    fontSize: "1.2rem", 
                    padding: "0.8rem 2.5rem", 
                    borderRadius: "10px", 

                }}
            />
        </Box>
    );
};

export default AddInterns;

