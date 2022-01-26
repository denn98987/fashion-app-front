import logo from './logo.svg';
import './App.css';
import {
    AppBar,
    Button,
    Card,
    CardActionArea, CardActions, CardMedia,
    Container,
    ImageList,
    ImageListItem,
    Link,
    MenuItem,
    Typography
} from '@mui/material';
import { MenuList } from '@mui/material';
import {useState} from "react";
import {FileUploader} from "react-drag-drop-files";
import {Close, SearchOff} from '@mui/icons-material';
import postData from "./PostData.js";

const fileTypes = ["JPG", "PNG", "GIF"];
function App() {
    const [file, setFile] = useState(null);
    const [searchFieldHide, setSearchFieldHide] = useState(true);
    const [dataItems, setDataItems] = useState([

    ]);
    const [historyItems, setHistoryItems] = useState([]);
    const handleChange = (file) => {
        setFile(file);
    };
    const searchClick = async () => {
        setSearchFieldHide(false);
        // console.log(file);
        const response = await postData(file);
        console.log(response);
        setDataItems(response.shops.length > 3 ? response.shops : response.links);
        setHistoryItems([file, ...historyItems]);
    };
  return (
      <div>
          <AppBar position="static" color="primary" enableColorOnDark id="MainMenu">
              <h3 className="logo">
                  Fashion Search
              </h3>
              <MenuList className="MainMenuList">
                  <MenuItem>Поиск</MenuItem>
                  <MenuItem>История</MenuItem>
              </MenuList>
          </AppBar>
          <Container maxWidth="sm" id="searchHeaderContainer">
              <Container id="FileContainer">
                  <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
              </Container>
              <Button variant="contained" style={{backgroundColor: "#19d29e"}} onClick={searchClick}>Поиск!</Button>
          </Container>
          <Container maxWidth="sm" id="searchBodyContainer" className={searchFieldHide ? "hideField" : "showedField" }>
              <Container className="SearchedFieldHeader">
                <Typography variant="h5" component="h5" style={{padding: "6px 0", color: "white"}}>
                  Найдено
                </Typography>
                <Button onClick={() => setSearchFieldHide(true)}>
                  <Close
                      style={{margin: "4px -20px"}}
                      sx={{ color: "#fff" }}
                      />
                </Button>
              </Container>
              <Container>
                  <ImageList sx={{ width: 500, height: 450, margin: "20px auto"}} cols={3} rowHeight={210} gap={20}>
                      {dataItems.map((item) => (
                          <ImageListItem key={item.icon}>
                              <Card sx={{ maxWidth: 345, display: "flex", flexDirection: "column", alignItems: "center" }}>
                                  <CardActionArea>
                                      <CardMedia
                                          component="img"
                                          height="164"
                                          image={item.icon}
                                          alt={item}
                                      />
                                  </CardActionArea>
                                  <CardActions>
                                    <Button onClick={() => window.open(item.href, '_blank')}>{new URL(item.href).hostname.slice(0, 11)}</Button>
                                  </CardActions>
                              </Card>
                          </ImageListItem>
                      ))}
                  </ImageList>
              </Container>
          </Container>
          <Container maxWidth="sm">
              <Typography variant="h3" component="h3" id="historyHeader">
                  История поиска
              </Typography>
          </Container>
          <Container maxWidth='sm' id="historyCards">
          {
              <ImageList sx={{ width: 500, height: 450, margin: "20px auto"}} cols={3} rowHeight={210} gap={20}>
                  {historyItems.map((item) => (
                      <ImageListItem key={item}>
                          <Card sx={{ maxWidth: 345, display: "flex", flexDirection: "column", alignItems: "center" }}>
                              <CardActionArea>
                                  <CardMedia
                                      component="img"
                                      height="164"
                                      image={URL.createObjectURL(item)}
                                      alt={item}
                                  />
                              </CardActionArea>
                          </Card>
                      </ImageListItem>
                  ))}
              </ImageList>
          }
          </Container>
      </div>
  );
}

export default App;
