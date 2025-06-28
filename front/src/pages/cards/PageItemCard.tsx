import {Box, Typography, Paper, CircularProgress, Alert, Button} from "@mui/material";
import MyContainer from "../../components/container/Container";
import {useGetItemCardQuery} from "../../bll/cards/cards.service";
import {useLocation, useNavigate} from "react-router-dom";

const PageItemCard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {id} = location.state || {};
    const {error, isLoading, data} = useGetItemCardQuery(id);

    if (!id) return <Alert severity="error">Нет ID карточки</Alert>;
    if (isLoading) return <CircularProgress />;
    if (error) return <Alert severity="error">Ошибка при загрузке</Alert>;

    return (
        <MyContainer>
            <Paper elevation={3} sx={{p: 3, mt: 4}}>
                <Typography variant="h5" gutterBottom>
                    {data?.name}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                    Email: {data?.email}
                </Typography>
                <Typography variant="body1" paragraph>
                    {data?.body}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                    Post ID: {data?.postId} • Comment ID: {data?.id}
                </Typography>

                <Box mt={3}>
                    <Button variant="outlined" onClick={() => navigate(-1)}>
                        back
                    </Button>
                </Box>
            </Paper>
        </MyContainer>
    );
};

export default PageItemCard;