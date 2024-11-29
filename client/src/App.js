import React from 'react';
// import DetailsBlog from "./DetailsBlog" (đường dẫn đến file đó)

function App() {
  return (
    <div className="App">
      <h1>Hello, React is working!</h1>
    </div>
  );
}
return BlocProvider(
  create: (_) {
    final cubit = CarDetailsCubit(getIt<CarUseCase>());
    return cubit;
  },
  child: Builder(
    builder: (context) {
      final cubit = context.read<CarDetailsCubit>();
      return Scaffold(
        
      )
    },
  ),
)
export default App;
