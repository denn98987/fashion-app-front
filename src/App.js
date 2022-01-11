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
        {
            href: "https://www.ozon.ru/product/futbolka-print-bar-173286049/",
            icon: "//avatars.mds.yandex.net/i?id=2ad3d3d6731286639b277aaa26c8fcc7-5452154-images-thumbs&n=13"
        },
        {
            href: "http://futbolki-shop.ru/detskiye-futbolki-dlya-machikov/futbolki-dying-light-1238000/",
            icon: "https://avatars.mds.yandex.net/i?id=5fadae07f0d1cc8e0dfbc993d164b6b4-5666834-images-thumbs&n=13"
        },
        {
            href: "https://printbar.kz/zhenskiye-futbolki/futbolki-les-1270042/",
            icon: "https://avatars.mds.yandex.net/i?id=4483798fa222fab79feb8fb59a6e052f-5680151-images-thumbs&n=13"
        },
        {
            href: "http://futbolki-shop.ru/detskiye-futbolki-dlya-machikov/futbolki-clarice-3183580/",
            icon: "https://avatars.mds.yandex.net/i?id=9eb9115891e7c2690b97e7c027c4b503-5241728-images-thumbs&n=13"
        },
        {
            href: "https://www.ozon.ru/product/futbolka-print-bar-173286049/",
            icon: "//avatars.mds.yandex.net/i?id=2ad3d3d6731286639b277aaa26c8fcc7-5452154-images-thumbs&n=13"
        },
        {
            href: "http://futbolki-shop.ru/detskiye-futbolki-dlya-machikov/futbolki-dying-light-1238000/",
            icon: "https://avatars.mds.yandex.net/i?id=5fadae07f0d1cc8e0dfbc993d164b6b4-5666834-images-thumbs&n=13"
        },
    ]);
    const [historyItems, setHistoryItems] = useState([]);
    const handleChange = (file) => {
        setFile(file);
    };
    const searchClick = () => {
        setSearchFieldHide(false);
        // console.log(file);
        // postData(file);
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
              <Button variant="contained" style={{backgroundColor: "#19d29e"}} onClick={() => searchClick()}>Поиск!</Button>
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
