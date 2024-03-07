import { useEffect, useState } from 'react';
import {
  GlobalStyle,
  MainContainer,
  MainHeader,
  User,
  UserBox,
  UserDetails,
  UserId,
  UserImage,
  UserName,
  UserScore,
} from '../../Components/styleComponents';
import { randomNum } from '../../Common/calculate';
import usersJson from '../../Data/users.json';
import './Home.css';
import Counter from '../../Components/Counter';

// user interface
interface UserObj {
  userID: string;
  displayName: string;
  picture: string;
  score: number;
}

const Home = () => {
  const [users, setUsers] = useState<UserObj[]>(usersJson);
  const [scores, setScores] = useState<number[]>([]);

  const sortHandler = (a: number, b: number) => {
    if (a < b) return 1;
    if (a > b) return -1;
    return 0;
  };

  const scrollHandler = () => {
    setUsers((users: UserObj[]) => {
      let updatedUserArr: UserObj[] = users.map((user: UserObj) => {
        user.score += randomNum(0, 10000);
        return user;
      });

      setScores(updatedUserArr.map(({ score }) => score).sort(sortHandler));
      return updatedUserArr;
    });
  };

  useEffect(() => {
    let timer = setInterval(() => {
      scrollHandler();
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const variantHandler = (position: number) => {
    let variant: string = 'primary';
    if (position === 0) variant = 'danger';
    if (position === 1) variant = 'warning';
    if (position === 2) variant = 'orange';
    return variant;
  };

  return (
    <div className='App'>
      <GlobalStyle />
      <MainHeader>Live Subscriber Counts</MainHeader>
      <MainContainer>
        {users.map(({ displayName, picture, score, userID }: UserObj, index: number) => {
          const position = scores.indexOf(score) === -1 ? index : scores.indexOf(score);
          return (
            <User key={userID} top={position}>
              <UserDetails>
                <UserBox>
                  <UserId variant={variantHandler(position)}>{position + 1}</UserId>
                  <UserImage src={picture} />
                </UserBox>
                <UserName>{displayName}</UserName>
              </UserDetails>
              <UserScore>
                <Counter score={score} />
              </UserScore>
            </User>
          );
        })}
      </MainContainer>
    </div>
  );
};

export default Home;
