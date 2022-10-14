//EVENTOS O FUNCIONALIDADES PARA TABLA MENSAJE

//Funcion limpiar campos del formulario

function limpiar_formulario(){
	//if (confirm("Esta seguro que desea limpiar el formulario?")){
		var campoTextoID = document.getElementById("id");
		var campoTextoMessagetext = document.getElementById("messagetext");
		var divResultado = document.getElementById("resultado");
		
		campoTextoID.value = "";
		campoTextoMessagetext.value = "";
		divResultado.innerHTML = ""
		
		//Otra forma de limpiar las cajas del html
		
		/*
		$("#id").val("");
		$("#messagetext").val("");
		*/
	//}
}



//Funcion (GET) consultar o traer toda la informacion o registro de la tabla Mensaje
function consultar_todo(){
    $.ajax({
        url:"https://g0849a4797b6069-tbhpw6zjeit47vd3.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/message/message",
        type:"GET",
        datatype:"json",
		
		error: function(xhr, status){
			alert('Ha ocurrido un problema, intentalo nuevamente' );
		},
		
		complete: function(){
			alert('Resultado de comprobacion, 200  ' );
		},	
		
        success:function(json){
            //console.log(respuesta);
            //crearRespuestaGastos(respuesta.items)
			
			$("#resultado").empty();
			tabla = "<center> <table border='1'> <tr> <th>ID:</th> <th>MESSAGETEXT:</th>   </tr> </tr>"
			filas = ""
			for (i=0; i<json.items.length; i++){
				filas += "<tr>";
				filas += "<td>" + json.items[i].id + "</td>";
				filas += "<td>" + json.items[i].messagetext + "</td>";
				filas += "<td> <button onclick='borrar_registro("+json.items[i].id+")'>Borrar</button>";//se agrega el boton y este tiene la funcion borrar registro:
				filas += "</tr>";
			}
			filas += "</table>"
			$("#resultado").append(tabla + filas + "<tr><th colspan='2'> <td>" +  "</center>")
			console.log(json)
			
			
        }

    });
}



/* 
function crearRespuestaMensaje(items){

    let myTable ="<table border='1'>";
    for(i=0;i<items.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+items[i].id+"</td>";
        myTable+="<td>"+items[i].messagetext+"</td>";
        myTable+="<td> <button onclick='borrarElementoRoom("+items[i].id+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado").append(myTable);

}
*/


function validarCampo(campoTexto){
	if(campoTexto.val() != ""){
		return true;
	}
	else{
		return false;
	}
}


//Funcion (POST) Registrar o Guardar toda la informacion en la tabla Mensaje

function guardarInformacion(){
	
	if(!validarCampo($("#messagetext"))){
		alert("Debe ingresar un mensaje de texto");
		return;
	}
	
	
    $.ajax({
        url: "https://g0849a4797b6069-tbhpw6zjeit47vd3.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/message/message",
		
		data:{
            mensaje: $("#messagetext").val(),	
			
					
		},
		
		type: 'POST',
		
		dataType: 'json',
		
				
        success:function(json){		
        },
		
		error: function(xhr, status){
			if(xhr, status == 200){
				console.log("El registro se guardado con exito");
			}
			else{
				console.log("Por favor revise que los datos esten correctos");
			}
		},
		
		complete: function(){
			alert('La peticion al servidor ha sido procesada con exito, 200');
			limpiar_formulario();
			consultar_todo();
			
		},	
    });
}








//Funcion (PUT) Editar o Actualizar registro de la tabla Mensaje
function editar_Informacion(){
    let myData={
        id:$("#id").val(),
		mensaje:$("#messagetext").val(),
		
        
    };
    console.log(myData);
    let dataToSend = JSON.stringify(myData);
	
	if (confirm("Esta seguro de eliminar el registro  " + $("#id").val() + "  ?")){
		
		$.ajax({
			url:"https://g0849a4797b6069-tbhpw6zjeit47vd3.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/message/message",
			type:"PUT",
			data:dataToSend,
			contentType:"application/JSON",
			datatype:"JSON",
			success:function(xhr, status){
				$("#resultado").empty();

				consultar_todo();
				alert("se ha realizado la Actualicion del registro correctamente")
			}
		});
	}
}






//Funcion (DELETE) Borrar o Eliminar registro de la tabla Mensaje
function borrar_registro(idElemento){
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);
	
	
	if (confirm("Esta seguro de eliminar el registro  " + idElemento + "  ?")){
	
		$.ajax({
			url:"https://g0849a4797b6069-tbhpw6zjeit47vd3.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/message/message",
			type:"DELETE",
			data:dataToSend,
			contentType:"application/JSON",
			datatype:"JSON",
			
			success:function(xhr, status){
				$("#resultado").empty();
				limpiar_formulario();
				consultar_todo();
				alert("El registro se ha Eliminado correctamente.")
				
			}
		});
	}
}

//Funcion (GET) para buscar o Consultar por ID

function consultaID(id){
	if(!validarCampo(id)){
		alert("Debe ingresar ID valido a buscar"+id.attr("id"));
	
	}
	else{

		$.ajax({
			url: 'https://g0849a4797b6069-tbhpw6zjeit47vd3.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/message/message'+ id.val(),
			
			type: 'GET',
			dataType: 'json',

			success: function(json){
				tabla = "<center><table border='1'>";
				filas = "";
				if (json.items.length > 0){
					console.log(json);
					$("#resultado").empty();
					filas += "<tr><th>ID:<td>" + json.items[0].id
					filas += "<tr><th>MESSAGETEXT:<td>" + json.items[0].messagetext
					$("#resultado").append(tabla + filas + "</center>")
					
				}
				else{
					alert("El registro con ID: "+ id.val() + "No existe")
				}
				
			},

			error: function(xhr, status){
				alert('Ha ocurrido un problema, Error: ' );
			},
			
			complete: function(){
				alert('La peticion ha sido realizada' );
				
			}		

		});
	}
}
