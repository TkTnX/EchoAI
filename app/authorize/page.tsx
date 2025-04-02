const AuthorizePage = () => {
  return (
    <div className="">
      <h2>С возвращением (Регистрация)</h2>
      <form>
        <input type="email" placeholder="Email" name="email" />
        <input type="password" placeholder="Password" name="password" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AuthorizePage;
