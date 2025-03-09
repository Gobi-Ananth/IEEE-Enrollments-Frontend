import styled from "styled-components";

const ErrorCard = styled.div`
  background-color: #ffab00;
  border-radius: 8px;
  padding: 32px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 40rem;
  margin: 0 auto;
  text-align: center;
  border: 2px solid black;

  @media (max-width: 768px) {
    max-width: 320px;
    padding: 24px;
  }

  @media (max-width: 480px) {
    max-width: 280px;
    padding: 16px;
  }
`;

const ErrorTitle = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const ErrorCode = styled.div`
  font-size: 8rem;
  font-weight: 900;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    font-size: 4rem;
  }

  @media (max-width: 480px) {
    font-size: 3rem;
  }
`;

const ErrorMessage = styled.p`
  font-size: 1.25rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

export default function NotFoundScreen() {
  return (
    <>
      <ErrorCard>
        <ErrorTitle>ERROR</ErrorTitle>
        <ErrorCode>404</ErrorCode>
        <ErrorMessage>
          Oops! The page you requested could not be found.
        </ErrorMessage>
      </ErrorCard>
    </>
  );
}
