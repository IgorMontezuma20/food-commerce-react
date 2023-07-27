import { useParams } from 'react-router-dom'
import { Container, Inner, Title, SubTitle } from './styles'
import { Head } from '../../../components/Head'

export default function OrderSuccessPage() {
  const { orderId } = useParams()
  return (
    <Container>
      <Head title='Compra realizada com sucesso!' />

      <Inner>
        <Title>Compra realizada com sucesso!</Title>

        <p>
          Número de Pedido <code>#{orderId}</code>
        </p>

        <SubTitle>Dados de contato da loja</SubTitle>

        <ul>
          <li>Endereço: Av Central, 123</li>
          <li>Tel: 11 3910-0346</li>
        </ul>

        <br />
        <a href='/'>Voltar para a página inicial</a>
      </Inner>
    </Container>
  )
}
